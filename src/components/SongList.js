//曲を一覧表示する機能
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function SongList(props) {
    if (props.isLoading)
      return (
        <div className="inset-0 flex justify-center items-center">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      );
  
    return (
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {props.songs.map((song) => {
            return (
              //画面をクリックしたら、対応する曲が流れるコード ↓↓↓
              <div onClick={()=>props.onSongSelected(song)}  key={song.id} className="flex-none cursor-pointer">
                <img
                  alt="thumbnail"
                  src={song.album.images[0].url}
                  className="mb-2 rounded"
                  
                />
                <style jsx>
                  {`
                    .flex-none{
                    transition: all 0.6s ease 0s;
                    }
                    .flex-none:hover{
                      cursor: pointer;
                      transform: scale(1.1, 1.1);
                    }
                  `}
                </style>
                <h3 className="text-lg font-semibold">{song.name}</h3>
                <p className="text-gray-600">By {song.artists[0].name}</p>
              </div>
            );
          })}
      </div>
    );
  }