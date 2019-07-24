import { put, takeEvery, all, call, select } from 'redux-saga/effects'
import fetch from 'cross-fetch'
import { requestPosts, receivePosts } from './actions'

const getPostsBySubreddit = (state) => state.postsBySubreddit

function* fetchPostsIfNeeded(action) {
    const postsBySubreddit = yield select(getPostsBySubreddit)
    const { subreddit } = action
    const posts = postsBySubreddit[subreddit]
    let neededFlag = true
    if (!posts) {
        neededFlag = true
    } else if (posts.isFetching) {
        neededFlag = false
    } else {
        neededFlag = posts.didInvalidate
    }
    if (neededFlag) {
        yield put(requestPosts(subreddit))
        try {
            const response = yield call(fetch, `https://www.reddit.com/r/${subreddit}.json`)
            const json = yield call([response, response.json])
            yield put(receivePosts(subreddit, json))
        } catch (error) {
            // TODO
        }
    }
}

// when action FETCH_POSTS_IF_NEEDED comes, it will go to fetchPostsIfNeeded
function* watchFetchPosts() {
    yield takeEvery('FETCH_POSTS_IF_NEEDED', fetchPostsIfNeeded)
}

export default function* rootSaga() {
    yield all([
        watchFetchPosts()
    ])
}