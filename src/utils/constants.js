export const monthes = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
];
export const days = [
	'Воскресенье',
	'Понедельник',
	'Вторник',
	'Среда',
	'Четверг',
	'Пятница',
	'Суббота',
];

export const getColor = (pri) => {
	switch (pri) {
		case 0:
			return 'green';
		case 1:
			return 'yellow';
		case 2:
			return 'orange';
		default:
			return 'red';
	}
};

export const data = [
	{
		id: 1,
		title: 'Разработать сайт для дипломной',
		description: 'The mobile version requires you to turn your phone sideways Doesnt work in vertical position',
		pri: 1
	},
	{
		id: 2,
		title: 'Сделать дизайн',
		description: 'Additionally please provide an estimation: Checkbox option (select multiple) Words IN White font then a See Image (in blue) when you click on it an image Opens in a pop up.',
		pri: 3
	},
	{
		id: 3,
		title: 'Найти темы для поступления в магистратуру',
		description: 'Add ability to add polygons one by one. Add shortcute ESC for editor tool reset',
		pri: 0
	},
	{
		id: 4,
		title: 'Сдать сессию',
		description: 'Fix render size in template editor. Fix template permanent image position',
		pri: 2
	},
	{
		id: 5,
		title: 'Прочитать жизнь взаймы или у неба любимчиков нет',
		description: 'Fix cart image crop when image when its not square',
		pri: 3
	},
]