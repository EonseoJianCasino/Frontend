type ResultPageProps = {
  onOpenDetail: () => void;
  onPrev: () => void;
};

export default function ResultPage({ onOpenDetail, onPrev }: ResultPageProps) {
  const performance = 20;
  const security = 60;

  return (
    <div className="flex flex-col gap-4">
      <div className="popup_metric_box">
        <div className="flex items-center">
          <div className="popup_metric_label">성능</div>
          <div className="ml-auto flex items-center gap-2">
            <div className="popup_metric_value">{performance}</div>
            <span className="popup_status_bad" aria-label="bad">!</span>
          </div>
        </div>
        <div className="popup_progress mt-3">
          <div className="popup_progress_bar" style={{ width: `${performance}%` }} />
        </div>
      </div>
      <div className="popup_metric_box">
        <div className="flex items-center">
          <div className="popup_metric_label">보안</div>
          <div className="ml-auto flex items-center gap-2">
            <div className="popup_metric_value">{security}</div>
            <span className="popup_status_good">✓</span>
          </div>
        </div>
        <div className="popup_progress mt-3">
          <div className="popup_progress_bar" style={{ width: `${security}%` }} />
        </div>
      </div>

      <div className="flex justify-center gap-3 pt-2">
        <button
          type="button"
          className="popup_btn_submit popup_btn_background"
          onClick={onOpenDetail}
        >
          자세히 보기 
        </button>
        <button type="button" onClick={onPrev} className="popup_btn_secondary">
          다시 측정하기 ↻
        </button>
      </div>
    </div>
  );
}
