//ページネーション機能を作成するコード
export function Pagination(props) {
    return (
      <div className="mt-8 flex justify-center">
        <button disabled={props.onPrev == null} onClick={props.onPrev} className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
          前へ
        </button>
        <button disabled={props.onNext == null} onClick={props.onNext} className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-4">
          次へ
        </button>
      </div>
    );
  }