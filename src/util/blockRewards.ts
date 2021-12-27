import Big from 'big.js';

const MOJO_PER_CHIA = Big(1000000);
const BLOCKS_PER_YEAR = 1681920;
const PREFARM = 10564560000 + 10564560000 + 14086080000 + 35215200000;

export function calculatePoolReward(height: number): Big {
  if (height === 0) {
    return MOJO_PER_CHIA.times(PREFARM).times(7 / 8);
  }
  if (height < 2 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(2 * 2500).times(7 / 8);
  }
  if (height < 4 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(1 * 2500).times(7 / 8);
  }
  if (height < 6 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(0.5 * 2500).times(7 / 8);
  }
  if (height < 8 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(0.25 * 2500).times(7 / 8);
  }
  if (height < 10 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(0.125 * 2500).times(7 / 8);
  }

  return MOJO_PER_CHIA.times(0.0625 * 2500).times(7 / 8);

}

export function calculateBaseFarmerReward(height: number): Big {
  if (height === 0) {
    return MOJO_PER_CHIA.times(PREFARM).times(1 / 8);
  }
  if (height < 2 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(2 * 2500).times(1 / 8);
  }
  if (height < 4 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(1 * 2500).times(1 / 8);
  }
  if (height < 6 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(0.5 * 2500).times(1 / 8);
  }
  if (height < 8 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(0.25 * 2500).times(1 / 8);
  }
  if (height < 10 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times(0.125 * 2500).times(1 / 8);
  }

  return MOJO_PER_CHIA.times(0.0625 * 2500).times(1 / 8);
}
