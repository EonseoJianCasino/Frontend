type ResultPageProps = {
  onOpenDetail: () => void;
  onPrev: () => void;
};

export default function ResultPage({ onOpenDetail, onPrev }: ResultPageProps) {
  return (
    <>
      <div className="text-sm text-gray-600">Result Page UI</div>
      <>
        <button
          type="button"
          className="mt-2 px-3 py-2 rounded bg-emerald-500 text-white"
          onClick={onOpenDetail}
        >
          Go Detail
        </button>
        <button type="button" onClick={onPrev} className="bg-slate-500">
          prev
        </button>
      </>
    </>
  );
}
