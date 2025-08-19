import { Button } from "../../ui/button";

interface FormCommunicateWithAIProps {
  isDisabled: boolean;
  handleSendMessageToClaude: () => void;
}

export const FormCommunicateWithAI = ({
  isDisabled = true,
  handleSendMessageToClaude,
}: FormCommunicateWithAIProps) => {
  return (
    <div>
      <Button
        disabled={isDisabled}
        type="button"
        onClick={() => handleSendMessageToClaude()}
      >
        내용 영어로 번역
      </Button>
    </div>
  );
};
