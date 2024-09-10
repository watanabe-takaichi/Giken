import { useEffect, useState } from 'react';
import { SongList } from './components/SongList';
import spotify from './lib/spotify';
import { useRef } from 'react';
import { Player } from './components/Player';
import { SearchInput } from './components/SearchInput';
import { Pagination } from './components/Pagination';
const limit = 20;

export default function App() {
  //console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID);
  //console.log(process.env.REACT_APP_SPOTIFY_CLIENT_SECRET);
  //挙動を確認するステートと、ローディングの状態を管理するステートを作成。
  const [isLoading, setIsLoading] = useState(false);
  const [popularSongs, setPopularSong] = useState([]);

  //選択した音楽の情報を格納するステートと、音楽の停止再生を管理するステートを作成
  const [isPlay, setIsPlay] = useState([false]);
  const [selectedSong, setSelectedSong] = useState();
  
  //検索キーワードと検索結果を格納するステートを作成
  const [keyword, setKeyword] = useState('');
  const [searchedSongs, setSearchedSongs] = useState();

  //オーディオタブに渡すRefも作成
  const audioRef =useRef(null);

  //検索結果があるかないか判定するステートを作成
  const isSearchedResult = searchedSongs != null;

  //現在何ページ目なのかとう情報を格納するステート
  const [page, setPage] = useState(1);

  //次のページや前のページがるか格納するステート
  const [hasNext, setHasNext] = useState(false); 
  const [hasPrev, setHasPrev] = useState(false); 

  useEffect(() => {
    fetchPopularSongs();

  }, []);

  const fetchPopularSongs = async () => {
    setIsLoading(true);
    const result = await spotify.getPopularSongs();
    //SpotifyAPIから応答したパラメータの中で、余計な情報はいらなかったので「track」情報だけを抽出する。
    const popularSongs = result.items.map((item) => {
      return item.track;
    });
    setPopularSong(popularSongs);
    setIsLoading(false);
  };

  const handleSongSelected = async(song) => {
    setSelectedSong(song);
    //プレビューがない曲は画面をクリックしたら、エラーはいたので、↓で無理やり解消させた。
    if(song.preview_url != null) {
      audioRef.current.src = song.preview_url;
      playSong();
    }else{
      pauseSong();
    }
  };

  //音楽を再生するメソッド
  const playSong = () => {
    audioRef.current.play();
    setIsPlay(true);
  };

  //音楽を停止するメソッド
  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlay(false);
  };

  //現在音楽を再生しているならば音楽を停止させ、停止しているならば、再生させる処理を行うメソッド
  const toggleSong = () => {
    //isPlay=trueのときは、音楽を停止させるメソッドを発動、falseの時は、再生させるメソッドを発動させる。
    if(isPlay) {
      pauseSong();
    }else{
      playSong();
    }
  };

  //検索したキーワードを受け取るメソッド
  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  //検索キーワードをSpotifyAPIにリクエストするメソッド
  const searchSongs = async (page) => {
    setIsLoading(true); //APIにリクエストを投げている間ローダーを回す
    const offset = parseInt(page) ? (parseInt(page)-1)*limit : 0;
    const result = await spotify.searchSongs(keyword, limit, offset);
    setHasNext(result.next != null);
    setHasPrev(result.previous != null);
    setSearchedSongs(result.items);
    setIsLoading(false); //APIにリクエストを投げた後、ローダーを止める
  };

  //ページネーションの「次へ」ボタンを押したら処理するメソッド
  const moveToNext = async() => {
    const nextPage = page + 1;
    await searchSongs(nextPage);
    setPage(nextPage);
  };

    //ページネーションの「前へ」ボタンを押したら処理するメソッド
    const moveToPrev = async() => {
      const prevPage = page - 1;
      await searchSongs(prevPage);
      setPage(prevPage);
    };


  return (
    <div className="flex flex-col min-h-screen bg-red-300 text-white">
      <main className="flex-1 p-8 mb-10">
        <header className="flex justify-center items-center mb-10">
          <h1 className="text-4xl font-bold">技研成果物 音楽アプリ</h1>
        </header>
        <SearchInput onInputChange={handleInputChange} onSubmit={searchSongs} />
        <section>
          <h2 className="text-2xl font-semibold mb-5">{isSearchedResult ? "検索結果" : "人気の曲"}</h2>
          <SongList isLoading={isLoading} songs={isSearchedResult ? searchedSongs : popularSongs} onSongSelected={handleSongSelected} />
          {isSearchedResult && <Pagination onPrev={hasPrev ? moveToPrev : null} onNext={hasNext ? moveToNext : null} /> }
          
        </section>
      </main>
      {selectedSong != null && <Player song={selectedSong} isPlay={isPlay} onButtonClick={toggleSong} />}
      <audio ref={audioRef} />
    </div>
  );
}
