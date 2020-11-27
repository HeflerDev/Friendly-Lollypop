const layerModule = (() => {
  const Layer = (layer) => {
    const grid = {
      isBlocked(item) {
        const itself = layer.getTileAtWorldXY(item.x, item.y, true).properties.collides;
        const above = layer.getTileAtWorldXY(item.x, item.y - 16, true).properties.collides;
        const bellow = layer.getTileAtWorldXY(item.x, item.y + 16, true).properties.collides;
        const onLeft = layer.getTileAtWorldXY(item.x - 16, item.y, true).properties.collides;
        const onRight = layer.getTileAtWorldXY(item.x + 16, item.y, true).properties.collides;
        return {
          itself,
          above,
          bellow,
          onLeft,
          onRight,
        };
      },

      tileIsDeadly(playerBody, isAlive) {
        if (layer.getTileAtWorldXY(playerBody.x, playerBody.y, true).properties.deadly && isAlive) {
          return true;
        }
        return false;
      },

      positioning(player, foe) {
        const playerX = layer.getTileAtWorldXY(player.x, player.y, true).x;
        const playerY = layer.getTileAtWorldXY(player.x, player.y, true).y;

        const foeX = layer.getTileAtWorldXY(foe.x, foe.y, true).x;
        const foeY = layer.getTileAtWorldXY(foe.x, foe.y, true).y;

        const verifyX = playerX - foeX;
        const verifyY = playerY - foeY;

        return {
          verifyX,
          verifyY,
        };
      },

      generateRandomFreeBlockPosition() {
        let loop = true;
        let randX;
        let randY;
        while (loop) {
          randX = Math.floor(Math.random() * 801);
          randY = Math.floor(Math.random() * 513);

          if (randX % 16 !== 0) {
            randX += 16 - (randX % 16);
          }

          if (randY % 16 !== 0) {
            randY += 16 - (randY % 16);
          }

          if (!layer.getTileAtWorldXY(randX, randY, true).properties.collides) {
            loop = false;
          }
        }
        return { randX, randY };
      },
    };
    return { grid };
  };

  return { Layer };
})();

export default layerModule;
