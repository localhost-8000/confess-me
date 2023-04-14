import { Tag } from '~/types/post';
import NormalChip from '~/layouts/chips/NormalChip';

export default function PostTags(props: {tags: Tag[] | undefined}) {
   const {tags} = props;

   return <>{ tags?.length 
      ? tags.map((tag, index) => <NormalChip key={index} title={tag} sx={{height: 'fit-content', paddingY: '2px', color: '#333346', borderColor: '#333346'}} />) 
      : null}
   </>
};
