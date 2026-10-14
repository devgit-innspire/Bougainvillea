const BASE = import.meta.env.BASE_URL;

export const asset = (path) => `${BASE}${path.replace(/^\//, '')}`;
export const img = (name, small = false) => asset(`assets/img/${name}${small ? '-sm' : ''}.jpg`);
export const video = (id) => asset(`assets/video/${id}.mp4`);
export const poster = (id) => asset(`assets/img/poster-${id}.jpg`);
