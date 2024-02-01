const menuItem = [
    {
        "order": 0,
        "name": "Home",
        "description": "",
        "route": "",
        "icon": "home",
        "image": "",
        "major": false
    },
    {
        "order": 1,
        "name": "Plan Usuarios",
        "description": "",
        "route": "user-career-plans",
        "icon": "history_edu",
        "image": "/img/user-career-plan.webp",
        "major": true
    },
    {
        "order": 2,
        "name": "Usuarios",
        "description": "",
        "route": "users",
        "icon": "reduce_capacity",
        "image": "/img/users.webp",
        "major": true
    },
    {
        "order": 3,
        "name": "Habilidades",
        "description": "",
        "route": "skills",
        "icon": "device_hub",
        "image": "/img/skills.webp",
        "major": true
        },
    {
        "order": 4,
        "name": "Planes de Carrera",
        "description": "",
        "route": "career-plans",
        "icon": "emoji_objects",
        "image": "/img/career-plans.webp",
        "major": true
    },
]

export const getAllMenuItems = () => menuItem;

export const getMenuMayor = () => menuItem.filter(item => item.major )