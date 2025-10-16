import { useEffect } from "react";

type LoadingPageProps = {
  onDone?: () => void;
};

export default function LoadingPage({ onDone }: LoadingPageProps) {
  useEffect(() => {
    const id = setTimeout(() => {
      onDone?.();
    }, 800); // simulate short loading then advance
    return () => clearTimeout(id);
  }, [onDone]);

  return <div className="text-sm text-gray-600">Loading Page UI</div>;
}
