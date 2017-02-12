var comments = [];

function getComments(id_post){
  return comments[id_post];
}

function addComment(id_post, text_com){
  comments[id_post].push({
    text:text_com
  });
}
