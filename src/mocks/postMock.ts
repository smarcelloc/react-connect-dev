import mock from '../utils/mock';
import { posts } from './data';

mock.onGet('/api/posts').reply(200, { posts });

mock.onGet('/api/post').reply((request) => {
  const id = parseInt(request.params.id);

  if (id < 1) {
    return [400, { message: 'This post was not found' }];
  }

  const post = posts.find((post) => post.id === id);
  if (!post) {
    return [400, { message: 'This post was not found' }];
  }

  return [200, { post }];
});
