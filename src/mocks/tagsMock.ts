import { TagsProps } from '../entities';
import mock from '../utils/mock';
import { tags } from './data';

mock.onGet('/api/tags').reply(200, { tags });

mock.onGet('/api/tags/top').reply(() => {
  const maxTagsTops = 5;

  if (tags.length === 0) {
    return [200, { tags: [] }];
  }

  if (tags.length > maxTagsTops) {
    return [200, { tags: getArrayInterval(tags, maxTagsTops) }];
  }

  return [200, { tags: getArrayInterval(tags, tags.length) }];
});

const getArrayInterval = (array: Array<TagsProps>, indexMax: number) => {
  const newTags: TagsProps[] = [];

  for (let i = 0; i < indexMax; i++) {
    newTags.push(array[i]);
  }

  return newTags;
};
