//再生ボタンの機能を作成するファイル
import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//引数propsに選択された曲の情報が入ってきて、再生ボタンを表示させる。
export function Player(props) {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 p-5">
      <div className="grid grid-cols-3">
        <div className="flex items-center">
          <img
            //↓選択した曲の画像を取得し、左端に表示させている。
            //SpotifyAPIから取得したpropsという変数の中にあるsongのalbumのimages情報を取得
            src={props.song.album.images[0].url}
            alt="thumbnail"
            className="rounded-full mr-3 h-[50px] w-[50px]"
          />
          <div>
            <p className="text-sm font-semibold">{props.song.name}</p>
            <p className="text-xs text-gray-400">{props.song.artists[0].name}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <FontAwesomeIcon
            onClick={props.onButtonClick}
            icon={props.isPlay ? faStopCircle : faPlayCircle}
            className={`text-white text-3xl mx-2 h-[40px] w-[40px] ${props.song.preview_url != null ? 'cursor-pointer' : 'opacity-50 pointer-events-none'} `}
          />
        </div>
      </div>
    </footer>
  );
}