const layerModule = (() => {
    const Layer = {
      isBlocked(player, layer) {
        const above = layer.getTileAtWorldXY(player.x, player.y - 16, true).properties.collides;
        const bellow = layer.getTileAtWorldXY(player.x, player.y + 16, true).properties.collides;
        const onLeft = layer.getTileAtWorldXY(player.x - 16, player.y, true).properties.collides;
        const onRight = layer.getTileAtWorldXY(player.x + 16, player.y, true).properties.collides;
        return {
          above,
          bellow,
          onLeft,
          onRight,
        };
      },

      isFatal(player, layer, isAlive) {
        if (layer.getTileAtWorldXY(player.x, player.y, true).y >= 34 && isAlive) {
          return true;
        }
        return false;
      },

      positioning(player, foe, layer) {
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
    }
    return { Layer }
})();

export default layerModule;
