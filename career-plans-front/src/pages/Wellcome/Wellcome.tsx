import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { ItemMenu } from '../../Interfaces/ItemMenu.interface';
import { getMenuMayor } from '../../services/MenuItemService';

interface Props {
  handleRoute: (dest: string) => void ;
}

export default function Wellcome({ handleRoute }: Props) {
  const [menuItems, setMenuItems] = useState<ItemMenu[]>([]);

  useEffect(() => {
    setMenuItems(getMenuMayor());
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        msFlexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap:'wrap',
        gap: '30px',
        flexDirection: 'row',
      }}
    >
      {menuItems.map(item => {
        return (
          <Card key={item.order} onClick={() => handleRoute(item.route)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 350,
            }}
          >
            <CardMedia
              component='img'
              height='130'
              image={item.image}
              alt={item.name}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {item.name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
