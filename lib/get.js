// TODO add a description
export default function get (p, o) {
  return p.split('.').reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)
}
