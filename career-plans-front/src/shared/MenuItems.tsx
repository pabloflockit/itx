import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Icon from '@mui/material/Icon';
import { useEffect, useState } from 'react';
import { ItemMenu } from '../Interfaces/ItemMenu.interface';
import { getAllMenuItems } from '../services/MenuItemService';

interface Props {
  handleRoute: (dest: string) => void;
}

export function MenuItems(props: Props) {
  const { handleRoute } = props;
  const [menuItems, setMenuItems] = useState<ItemMenu[]>([]);

  useEffect(() => {
    setMenuItems(getAllMenuItems());
  }, []);
  return (
    <>
      {menuItems.map(item => {
        return (
          <ListItemButton key={item.order} onClick={() => handleRoute(item.route)}>
            <ListItemIcon>
              <Icon>{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        );
      })}
    </>
  );
}
