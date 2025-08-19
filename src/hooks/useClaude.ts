import { useState } from "react";
import { sendMessageToClaude } from "../app/api/services/claudeService";
import { useClaudeLoading } from "../context/ClaudeContext";

export const useClaude = (
  setEnglishContent: (content: string) => void,
  koreanContent: string
) => {
  const [error, setError] = useState<string | null>(null);
  const { setCladueLoading } = useClaudeLoading();

  const handleSendMessageToClaude = async () => {
    try {
      setError(null);
      setCladueLoading(true);
      console.log(koreanContent);
      const response = await sendMessageToClaude(koreanContent);
      console.log(response.content[0].text);
      setEnglishContent(response.content[0].text);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.log(err.message);
      } else {
        setError("Unknown Error occured");
        console.log("Unknown Error occured");
      }
    } finally {
      setCladueLoading(false);
    }
  };

  return { handleSendMessageToClaude };
};
