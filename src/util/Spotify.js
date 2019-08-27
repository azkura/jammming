const clientId = '9e3e14f83bf246eca50a1004d1d55827'
const redirectUri = 'http://assorted-sort.surge.sh/'
let accessToken= ''
let userId = ''

const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken
    }
    // check for acces token match

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

    if(accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1]
      const expiresIn = Number(expiresInMatch[1])

      // this clear the parameters, allowing us to grab a new access token when it expires

      window.setTimeout(() => accessToken = '', expiresIn * 1000)
      window.history.pushState('Access Token', null, '/')
      return accessToken
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
      window.location = accessUrl
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken()
    const endPoint = '/v1/search?type=track&q='
    return fetch(`https://api.spotify.com${endPoint}${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response) => {
      return response.json()
    }).then((jsonResponse) => {
      if(!jsonResponse.tracks) {
        return []
      }
      return jsonResponse.tracks.items.map(track => {
        console.log(track)
        return {
          id: track.id,
          name: track.name,
          artist: track.name,
          album: track.album.name,
          uri: track.uri
        }
      })
    })
  },

  getCurrentUserId() {
    if(!userId) {
      return 
    }
    const accessToken = Spotify.getAccessToken()
    const headers = {  Authorization: `Bearer ${accessToken}` }

    return fetch('https://api.spotify.com/v1/me', { headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id
    })
  },

  savePlaylist(name, trackUris) {
    if(!name || !trackUris.length) {
      return
    }
    const accessToken = Spotify.getAccessToken()
    const headers = {  Authorization: `Bearer ${accessToken}` }
    const userId = Spotify.getCurrentUserId()
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ name: name })
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ uris: trackUris})
        })
      })
  },

  getUserPlaylist(playlistName, playlistTitle) {
    const userId = Spotify.getCurrentUserId()
    const accessToken = Spotify.getAccessToken()
    const headers = {  Authorization: `Bearer ${accessToken}` }

    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: headers,
      method: 'GET',
      body: JSON.stringify({ playlistName})
    }).then(response => response.json()
    ).then(jsonResponse => {
      const playlistId = jsonResponse.id
      console.log(playlistId)
    })
  }
}

export default Spotify