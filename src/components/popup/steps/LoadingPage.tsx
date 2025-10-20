import { useEffect } from "react";

type LoadingPageProps = {
  onDone: () => void;
};

export default function LoadingPage({ onDone }: LoadingPageProps) {
  useEffect(() => {
    const id = setTimeout(() => {
      onDone();
    }, 2000);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      <div className="popup_loading_spinner" />
      <div className="popup_loading_text">현재 페이지를 분석하고 있습니다</div>
    </div>
  );
}
