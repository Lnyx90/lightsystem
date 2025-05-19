
export function isNear(x1, y1, x2, y2, radius = 20) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return dx * dx + dy * dy <= radius * radius;
  }
  
  
  export function isColliding(playerX, playerY, obstacles, radius = 20) {
    return obstacles.some(({ x, y }) => isNear(playerX, playerY, x, y, radius));
  }
  