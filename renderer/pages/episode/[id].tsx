import Widgets from '../../components/widgets/widgets';
import Navbar from "../../components/navbar/navbar";
import { useRouter } from 'next/router';

export default function MyCharacter(props) {
  const router = useRouter()
  let id:string;
  if(typeof router.query.id === 'string') id = router.query.id;
  if(!id) id = 'Pilot-1';

  return (
    <>
      <Navbar>
        <Widgets params={{id: id}} />
      </Navbar>
    </>
  );
}
