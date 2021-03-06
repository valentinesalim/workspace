function sanitize(link) {
  let copyLink = link;
  const ytExists = link.indexOf('youtube.com/watch');
  console.log(ytExists);

  if (ytExists !== -1) {
    copyLink = copyLink.replace('watch?v=', 'embed/');
  }

  return copyLink;
}

export default sanitize;
