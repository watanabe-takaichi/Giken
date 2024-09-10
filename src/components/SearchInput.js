//曲を検索するコード
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function SearchInput(props) {
  return (
    <section className="flex justify-center">
      <input
      onChange={props.onInputChange}
        className="bg-gray-100 w-1/3 p-2 rounded-l-lg focus:outline-none text-black"
        placeholder="検索する曲名を入力してください"
      />
      <button onClick={props.onSubmit} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>
  );
}