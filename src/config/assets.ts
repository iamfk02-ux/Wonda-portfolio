/**
 * Asset Configuration for Wonda Design Studios (Wonderful Blessed)
 * 
 * IMPORTANT: To replace the temporary hero portrait with your own portrait photo:
 * 1. Place your image in the /public/assets/ folder (e.g. /public/assets/my-portrait.png)
 * 2. Update the `heroPortrait` path below.
 * 
 * The hero component will automatically render your photo with the exact same
 * editorial depth layering, positioning, and scale without altering the layout.
 */

export const ASSET_CONFIG = {
  // Hero portrait photograph of Wonderful Blessed (using user's uploaded portrait cutout)
  heroPortrait: '/WonderfulB-portrait.png',
  
  // Backup / fallback portrait path
  heroPortraitFallbackSvg: '/assets/wonderful-blessed-portrait.png',

  // Project visual photography assets
  projects: {
    luminaBotanique: '/assets/projects/lumina-botanique.png',
    kronosSpatial: '/assets/projects/kronos-spatial.png',
    solisCeramics: '/assets/projects/solis-ceramics.png',
    hyperionBiennial: '/assets/projects/hyperion-biennial.png',
    verveMonograph: '/assets/projects/verve-monograph.png',
  }
};
