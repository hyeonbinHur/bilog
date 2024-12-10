export default function timeAgo(targetDate: Date | string): string {
  const now = new Date();
  let target: Date;
  if (typeof targetDate === "string") {
    targetDate = targetDate.replace(" ", "T");
    target = new Date(targetDate);
  } else {
    target = targetDate;
  }
  // target이 유효한 Date 객체인지 확인
  if (isNaN(target.getTime())) {
    return "잘못된 날짜";
  }
  // 시간 차이 계산
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000); // 초 단위 차이
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);

  // 시간 차이에 따른 문자열 반환
  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 2) {
    return `하루 전`;
  } else if (diffInDays < 3) {
    return `이틀 전`;
  } else if (diffInMonths < 1) {
    return `${diffInDays}일 전`;
  } else if (diffInMonths === 1) {
    return `한달 전`;
  } else if (diffInMonths <= 12) {
    return `${diffInMonths}개월 전`;
  } else {
    return `${diffInMonths % 12}년전 `;
  }
}
