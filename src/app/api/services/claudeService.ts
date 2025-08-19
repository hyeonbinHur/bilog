// 클라이언트 사이드용 API 호출 함수
export async function sendMessageToClaude(content: string) {
  try {
    const response = await fetch("/api/claude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: content }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message to Claude");
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error sending message to Claude:", error);
    throw error;
  }
}
