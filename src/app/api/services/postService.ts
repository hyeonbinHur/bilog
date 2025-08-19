import { postFormatting } from "@/src/helper/postHelper";
import type {
  IMainPost,
  IPost,
  IPostBase,
  IPostUpdate,
  ISubPost,
} from "@/type";
import { supabase } from "../supabase/supabaseClient";

export const postService = {
  /**테스트 완료 */
  async getAllPosts() {
    const { data, error } = await supabase.from("posts").select("*");

    if (error) {
      throw new Error(`전체 게시물 조회 실패: ${error.message}`);
    }

    return {
      success: true,
      message: "전체 게시물을 성공적으로 조회했습니다.",
      data: data,
    };
  },

  async getSpecificPosts(
    limit: number,
    offset: number,
    locale: "ko" | "en",
    userId: string | null
  ) {
    const isAdmin = postHelper.isAdmin(userId);

    const table = postHelper.getTableByLocale(locale);

    const {
      data: subPost,
      error,
    }: { data: ISubPost[] | null; error: unknown } = await supabase
      .from(table)
      .select("*")
      .order("post_id", { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);

    if (error) throw new Error(`공개 게시물 조회 실패: ${error}`);
    if (!subPost) throw new Error("공개 게시물 조회 실패");

    const posts = await postHelper.fetchMainPostAndFormattingToPost(subPost);
    const finalPosts = isAdmin
      ? posts
      : posts.filter((post) =>
          locale === "ko" ? post.is_kor === "PUBLIC" : post.is_eng === "PUBLIC"
        );

    return {
      success: true,
      message: "일부 게시물 목록을 성공적으로 조회했습니다.",
      data: { posts: finalPosts, totalCount: finalPosts.length },
    };
  },

  async createPost(newPost: IPostBase, lang: string) {
    // 메인 포스트 생성
    console.log(newPost);
    const {
      data: mainPost,
      error,
    }: { data: IMainPost | null; error: unknown } = await supabase
      .from("posts")
      .insert({
        thumbnail: newPost.thumbnail,
        thumbnail_alt: newPost.thumbnail_alt,
        category_id: newPost.category_id,
        category_name: newPost.category_name,
        type: newPost.type,
        comments: newPost.comments,
        created_at: newPost.created_at,
        updated_at: newPost.updated_at,
        is_kor: newPost.is_kor,
        is_eng: newPost.is_eng,
        storagePath: newPost.storagePath,
      })
      .select()
      .single();

    if (error || !mainPost) {
      throw new Error(`메인 게시물 생성 실패`);
    }

    const korPost: ISubPost = {
      post_id: mainPost.post_id,
      title: newPost.title,
      subtitle: newPost.subtitle,
      content: newPost.content,
      status: lang === "Korean" ? newPost.status : "PRIVATE",
    };

    const engPost: ISubPost = {
      post_id: mainPost.post_id,
      title: newPost.title,
      subtitle: newPost.subtitle,
      content: newPost.content,
      status: lang === "English" ? newPost.status : "PRIVATE",
    };

    const [korResult, engResult] = await Promise.all([
      supabase.from("post_kor").insert(korPost),
      supabase.from("post_eng").insert(engPost),
    ]);

    if (korResult.error || engResult.error) {
      throw new Error("언어별 게시물 생성 실패");
    }

    return {
      success: true,
      message: "게시물이 성공적으로 생성되었습니다.",
      data: { post_id: mainPost.post_id },
    };
  },

  async getPostById(postId: string) {
    const [main_posts, kor_posts, eng_posts] = await Promise.all([
      supabase.from("posts").select("*").eq("post_id", postId).single(),
      supabase.from("post_kor").select("*").eq("post_id", postId).single(),
      supabase.from("post_eng").select("*").eq("post_id", postId).single(),
    ]);

    if (!main_posts.data || main_posts.error) {
      throw new Error("메인 포스트 에러");
    }
    if (!kor_posts.data || kor_posts.error) {
      throw new Error("한국어 포스트 에러");
    }
    if (!eng_posts.data || eng_posts.error) {
      throw new Error("영어 포스트 에러");
    }

    const mainPost: IMainPost = main_posts.data;
    const korPost: ISubPost = kor_posts.data;
    const engPost: ISubPost = eng_posts.data;

    return {
      success: true,
      message: "게시물을 성공적으로 조회했습니다.",
      data: {
        kor_post: postFormatting(mainPost, korPost),
        eng_post: postFormatting(mainPost, engPost),
      },
    };
  },

  async deletePost(postId: string, postStoragePath: string) {
    // 스토리지 삭제 함수
    const deleteStorageFiles = async () => {
      const { data: fileList, error: listError } = await supabase.storage
        .from("posts")
        .list(postStoragePath);

      if (listError)
        throw new Error(`스토리지 파일 목록 조회 실패: ${listError.message}`);

      if (fileList && fileList.length > 0) {
        const filePaths = fileList.map(
          (file) => `${postStoragePath}/${file.name}`
        );
        const { error: removeError } = await supabase.storage
          .from("posts")
          .remove(filePaths);

        if (removeError)
          throw new Error(`스토리지 파일 삭제 실패: ${removeError.message}`);
      }

      return { success: true, deletedFiles: fileList?.length || 0 };
    };

    // 4개 작업을 병렬로 실행 (스토리지 + 3개 테이블)
    const [storageResult, mainResult, korResult, engResult] =
      await Promise.allSettled([
        deleteStorageFiles(),
        supabase.from("posts").delete().eq("post_id", postId).select().single(),
        supabase.from("post_kor").delete().eq("post_id", postId).select(),
        supabase.from("post_eng").delete().eq("post_id", postId).select(),
      ]);

    // 에러 체크
    const errors = [];

    if (storageResult.status === "rejected") {
      errors.push(`스토리지 삭제 실패: ${storageResult.reason}`);
    }

    if (mainResult.status === "rejected") {
      errors.push(`메인 포스트 삭제 실패: ${mainResult.reason}`);
    } else if (mainResult.value.error) {
      errors.push(`메인 포스트 삭제 실패: ${mainResult.value.error.message}`);
    }

    if (korResult.status === "rejected") {
      errors.push(`한국어 포스트 삭제 실패: ${korResult.reason}`);
    } else if (korResult.value.error) {
      errors.push(`한국어 포스트 삭제 실패: ${korResult.value.error.message}`);
    }

    if (engResult.status === "rejected") {
      errors.push(`영어 포스트 삭제 실패: ${engResult.reason}`);
    } else if (engResult.value.error) {
      errors.push(`영어 포스트 삭제 실패: ${engResult.value.error.message}`);
    }

    if (errors.length > 0) {
      throw new Error(`게시물 삭제 실패: ${errors.join(", ")}`);
    }

    return {
      success: true,
      message: "게시물과 관련 파일이 성공적으로 삭제되었습니다.",
      data: {
        storage:
          storageResult.status === "fulfilled" ? storageResult.value : null,
        mainPost:
          mainResult.status === "fulfilled" ? mainResult.value.data : null,
        korPost: korResult.status === "fulfilled" ? korResult.value.data : null,
        engPost: engResult.status === "fulfilled" ? engResult.value.data : null,
      },
    };
  },

  async getPostsByTitle(
    title: string,
    limit: number,
    offset: number,
    locale: "ko" | "en",
    userId: string | null
  ) {
    const isAdmin = postHelper.isAdmin(userId);
    const table = postHelper.getTableByLocale(locale);
    const {
      data: subPost,
      error,
    }: { data: ISubPost[] | null; error: unknown } = await supabase
      .from(table)
      .select("*")
      .ilike("title", `%${title}%`)
      .order("post_id", { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);
    if (error) throw new Error(`공개 게시물 조회 실패: ${error}`);
    if (!subPost) throw new Error("공개 게시물 조회 실패");
    const posts = await postHelper.fetchMainPostAndFormattingToPost(subPost);
    const finalPosts = isAdmin
      ? posts
      : posts.filter((post) =>
          locale === "ko" ? post.is_kor === "PUBLIC" : post.is_eng === "PUBLIC"
        );

    return {
      success: true,
      message: "게시물 검색을 성공적으로 완료했습니다.",
      data: { posts: finalPosts, totalCount: finalPosts.length },
    };
  },

  async getPostsByCategory(
    limit: number,
    offset: number,
    locale: "ko" | "en",
    categoryId: string,
    userId: string | null
  ) {
    const isAdmin = postHelper.isAdmin(userId);
    const table = postHelper.getTableByLocale(locale);

    // First get main posts by category
    const {
      data: mainPosts,
      error: mainError,
    }: { data: IMainPost[] | null; error: unknown } = await supabase
      .from("posts")
      .select("*")
      .eq("category_id", categoryId)
      .order("post_id", { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);

    if (mainError || !mainPosts) {
      throw new Error(`카테고리 게시물 조회 실패: ${mainError}`);
    }

    const postIds = mainPosts.map((post) => post.post_id);

    const {
      data: subPosts,
      error: subError,
    }: { data: ISubPost[] | null; error: unknown } = await supabase
      .from(table)
      .select("*")
      .in("post_id", postIds);

    if (subError || !subPosts) {
      throw new Error(`서브 게시물 조회 실패: ${subError}`);
    }

    const posts = postHelper.formattingPosts(mainPosts, subPosts);
    const filteredPosts = isAdmin
      ? posts
      : posts.filter((post) =>
          locale === "ko" ? post.is_kor === "PUBLIC" : post.is_eng === "PUBLIC"
        );

    return {
      success: true,
      message: "카테고리별 게시물을 성공적으로 조회했습니다.",
      data: { posts: filteredPosts, totalCount: filteredPosts.length },
    };
  },

  async updatePostContent(
    postId: string,
    updateData: IPostUpdate,
    lang: "ko" | "en"
  ) {
    const isKorean = lang === "ko";
    const table = postHelper.getTableByLocale(lang);

    // 메인 포스트 업데이트 데이터
    const mainUpdateData = {
      thumbnail: updateData.thumbnail,
      thumbnail_alt: updateData.thumbnail_alt,
      category_id: updateData.category_id,
      category_name: updateData.category_name,
      updated_at: updateData.updated_at,
      ...(isKorean
        ? { is_kor: updateData.is_kor }
        : { is_eng: updateData.is_eng }),
    };

    // 서브 포스트 업데이트 데이터
    const subUpdateData = {
      title: updateData.title,
      subtitle: updateData.subtitle,
      content: updateData.content,
      status: isKorean ? updateData.is_kor : updateData.is_eng,
    };
    // 병렬로 업데이트 실행
    const [mainResult, subResult] = await Promise.all([
      supabase.from("posts").update(mainUpdateData).eq("post_id", postId),
      supabase.from(table).update(subUpdateData).eq("post_id", postId),
    ]);

    // 에러 체크
    if (mainResult.error) {
      throw new Error(`메인 게시물 업데이트 실패: ${mainResult.error.message}`);
    }

    if (subResult.error) {
      throw new Error(
        `${lang} 게시물 업데이트 실패: ${subResult.error.message}`
      );
    }

    return {
      success: true,
      message: "게시물이 성공적으로 업데이트되었습니다.",
      data: { post_id: postId },
    };
  },

  async updatePostComments(postId: string, commentsCount: number) {
    const { data, error } = await supabase
      .from("posts")
      .update({ comments: commentsCount })
      .eq("post_id", postId)
      .select()
      .single();
    if (error) throw new Error(`댓글 수 업데이트 실패: ${error.message}`);
    return {
      success: true,
      data,
      message: "댓글 수가 업데이트되었습니다.",
    };
  },
};

export const postHelper = {
  getTableByLocale(locale: "ko" | "en") {
    const tables = { ko: "post_kor", en: "post_eng" };
    if (!tables[locale]) throw new Error("지원하지 않는 언어입니다.");
    return tables[locale];
  },

  isAdmin(userId: string | null) {
    return userId === "5";
  },

  async fetchMainPostAndFormattingToPost(subPosts: ISubPost[]) {
    if (!subPosts?.length) return [];

    const postIds = subPosts.map((post) => post.post_id);

    const {
      data: mainPosts,
      error,
    }: { data: IMainPost[] | null; error: unknown } = await supabase
      .from("posts")
      .select("*")
      .in("post_id", postIds);

    if (error) throw new Error(`메인 게시물 조회 실패: ${error}`);
    if (!mainPosts) throw new Error("메인 게시물 조회 실패");

    return this.formattingPosts(mainPosts, subPosts);
  },

  formattingPosts(mainPosts: IMainPost[], subPosts: ISubPost[]) {
    const mainPostMap = new Map(mainPosts.map((post) => [post.post_id, post]));
    return subPosts
      .map((subPost) => {
        const mainPost = mainPostMap.get(subPost.post_id);
        if (!mainPost) {
          console.warn(`Main post not found for post_id: ${subPost.post_id}`);
          return null;
        }
        return postFormatting(mainPost, subPost);
      })
      .filter((post): post is IPost => post !== null) // null 제거 및 타입 가드
      .sort((a, b) => Number(b.post_id) - Number(a.post_id)); // post_id 내림차순 정렬
  },
};
