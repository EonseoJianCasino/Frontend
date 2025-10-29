import copyIcon from '@/assets/icons/copy.svg'
type CurrentPageProps = {
  onNext: () => void
}

export default function CurrentPage({ onNext }: CurrentPageProps) {
  const url =
    'https://example.com/very/long/path/with/many/segments/and?query=param&another=long#hash-section'

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {}
  }

  return (
    <>
      <div className="popup_infoBox">
        <div className="popup_infoText">
          <div className="popup_infoLabel">CURRENT URL</div>
          <div className="popup_infoValue">{url}</div>
        </div>
        <button type="button" className="popup_copyBtn" title="Copy" onClick={copy}>
          <img src={copyIcon} alt="copy" width={18} />
        </button>
      </div>
      <div className="mt-6 flex justify-center">
        <button type="button" onClick={onNext} className="popup_btn_submit popup_btn_background">
          성능 & 보안 분석 실행
        </button>
      </div>
    </>
  )
}
