const stats = [
	{ icon: 'hunger', value: 100, color: 'bg-red-500' },
	{ icon: 'energi', value: 100, color: 'bg-yellow-300' },
	{ icon: 'hygine', value: 100, color: 'bg-blue-400' },
	{ icon: 'happy', value: 100, color: 'bg-pink-400' },
];

function performAction(action) {
  switch (action) {
    case 'Enjoy the View':
    case 'Capture the Moment':
      updateStat('happiness', +10);
      break;
    case 'Rest & Eat Snacks':
      updateStat('energy', +15);
      updateStat('hunger', -10);
      break;
    case 'Hiking Journaling':
      updateStat('happiness', +5);
      break;

    case 'Hiking':
      updateStat('energy', -10);
      updateStat('happiness', +5);
      break;
    case 'Observe Nature':
      updateStat('happiness', +10);
      break;
    case 'Collect Firewood':
      updateStat('energy', -5);
      break;
    case 'Gather Spring Water':
      updateStat('hygiene', +10);
      break;

    case 'Set Up Tent':
      updateStat('energy', -5);
      break;
    case 'Cook Food':
      updateStat('hunger', -20);
      break;
    case 'Build a Campfire':
      updateStat('energy', -10);
      break;
    case 'Talk to Fellow Campers':
      updateStat('happiness', +15);
      break;

    default:
      break;
  }
}


export default stats;
