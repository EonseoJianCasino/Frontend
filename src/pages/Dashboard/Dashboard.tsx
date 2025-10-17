import React from "react";
import SimpleBarChart from "./SimpleBarChart";
import testData from "./testData";
import img_error from "./imgs/error.svg";
import img_ok from "./imgs/ok.svg";
import img_warning from "./imgs/warning.svg";

export default function PerformanceDashboardMain() {
  return (
    <main
      className="w-full max-w-[1700px] px-6 py-6 lg:px-8 bg-[#F5F9FA] 
    flex flex-col gap-y-6"
    >
      {/* 상단 메인 카드 */}
      <article
        className="relative 
          flex
          flex-col
          box-border p-4
          w-full
          h-[394px]
          bg-[#FFFFFF] rounded-[15px] shadow-md 
          border-[#DEEBEF] border-solid border-2"
      >
        <header>
          {/* 아이템  */}
          <div
            className="absolute left-4 -top-7 text-sm text-gray-500 
            flex flex-row  justify-start gap-x-4
            text-[14px] text-[#5C5C5C] font-semibold 
            "
          >
            <div className="flex flex-row  justify-start items-center">
              <span className="inline-block rounded-full w-[7px] h-[7px] bg-[#CCCCCC] mr-1"></span>
              <span>OFF</span>
            </div>

            <div className="flex flex-row  justify-start items-center">
              <span className="inline-block rounded-full w-[7px] h-[7px] bg-[#9EEDA7] mr-1"></span>
              <span>ON</span>
            </div>

            <div className="flex flex-row  justify-start items-center">
              <span className="inline-block rounded-full w-[7px] h-[7px] bg-[#ED9E9F] mr-1"></span>
              <span>OFF</span>
            </div>

            <div className="flex flex-row  justify-start items-center">
              <span className="inline-block rounded-full w-[7px] h-[7px] bg-[#FFE990] mr-1"></span>
              <span>OFF</span>
            </div>
          </div>
          <span className="absolute right-4 top-5 text-sm text-gray-500">
            <strong className="text-[#3A7CA5] font-semibold">10s </strong>측정
            결과
          </span>
          <h1 className="text-[30px] font-semibold">youtube.com</h1>
          <a
            className="text-[12px] text-[#888888]"
            href="https://www.youtube.com"
          >
            https://www.youtube.com
          </a>
        </header>

        {/* 차트 + 카드 */}
        <section
          className="w-full h-full flex flex-row  justify-start gap-x-4
        "
        >
          {/* 차트 섹션 */}
          <section className="flex-1 max-w-[452px] max-h-[284px]">
            <SimpleBarChart />
          </section>
          {/* 카드섹션  */}
          <section className="flex-1 flex flex-col gap-y-4">
            <div>
              <div>원</div>
              <div>
                <div>65점</div>
                <div>Total Score</div>
              </div>
            </div>
          </section>
        </section>
      </article>

      {/* 우선 개선이 필요한 항목 */}
      <article
        className="relative 
          box-border p-4
          w-full
          min-h-[372px]
          bg-[#FFFFFF] rounded-[15px] shadow-md 
          border-[#DEEBEF] border-solid border-2
          flex flex-col gap-y-5
          "
      >
        <h2 className="text-[12px] text-[#4B4B4B] font-semibold text-[20px] ">
          🚨 우선 개선이 필요한 항목
        </h2>
        {/* 
          // TODO : 상태에 따라 색상에 바뀌게 만들 것이다. (soft하게 만들기)
        */}
        <ul className="flex flex-col gap-y-4">
          <li className="px-4 gap-x-4 w-full h-[58px] bg-[#F8F9FA] flex flex-row rounded-[10px]  justify-center items-center box-border
          border-l-4 border-[#FF3C3C]
          ">
            <img src={img_error} />
            <div className="w-full h-full flex flex-col justify-center box-border">
              <div className="text-[16px] text-[#4B4B4B] font-semibold ">
                CSL 점수 개선이 필요
              </div>
              <div className="text-[12px] text-[#888888] font-semibold">
                레이아웃 이동으로 인한 사용자 경험 저하
              </div>
            </div>
          </li>
        </ul>

        <ul className="flex flex-col gap-y-4">
          <li className="px-4 gap-x-4 w-full h-[58px] bg-[#F8F9FA] flex flex-row rounded-[10px]  justify-center items-center box-border
          border-l-4 border-[#FABF35]
          ">
            <img src={img_warning} />
            <div className="w-full h-full flex flex-col justify-center box-border">
              <div className="text-[16px] text-[#4B4B4B] font-semibold ">
                보안 헤더 누락
              </div>
              <div className="text-[12px] text-[#888888] font-semibold">
                CSP, HTTPS 헤더가 설정되지 않음
              </div>
            </div>
          </li>
        </ul>

        <ul className="flex flex-col gap-y-4">
          <li className="px-4 gap-x-4 w-full h-[58px] bg-[#F8F9FA] flex flex-row rounded-[10px]  justify-center items-center box-border
          border-l-4 border-[#357BFA]
          ">
            <img src={img_ok} />
            <div className="w-full h-full flex flex-col justify-center box-border">
              <div className="text-[16px] text-[#4B4B4B] font-semibold ">
                SSL 인증서 만료 임박
              </div>
              <div className="text-[12px] text-[#888888] font-semibold">
                29일 후 만료 예정 - 갱신 준비 필요
              </div>
            </div>
          </li>
        </ul>
      </article>
    </main>
  );
}
