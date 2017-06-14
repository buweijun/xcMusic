import getData from '../../../api/getData';
export default {
  //获取音乐url
  async get_musicUrl(context, payload) {
    let res = await getData('queryMusicUrl', {
      id: payload
    });
    //判断是否更新音乐url
    if (context.state.curMusic == '' || context.state.curMusic != payload) {
      context.commit('set_musicUrl', res.data.data[0].url);
      context.commit('set_curMusic', payload);

    }
  },
  //获取歌曲详情
  async get_songDetails(context, payload) {
    let res = await getData('querySongDetail', payload);
    context.commit('set_songDetails', res.data);
  },
  //获取音乐歌词
  async get_Lyric(context, payload) {
    let res = await getData('queryLyric', payload);
    context.commit('set_Lyric', res.data.lrc.lyric);
    // console.log(res.data.lrc.lyric)
  },
  //获取歌曲播放所需接口
  async get_PlaySongDetails(context, payload) {
    // context.dispatch('get_musicUrl', payload);
    context.dispatch('get_songDetails', {
      ids: payload
    });
    context.dispatch('get_Lyric', {
      id: payload
    });
  }
}