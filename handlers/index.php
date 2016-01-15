<?php

if (!$this->internal) {
	$page->window_title = "Polls";
}

$id = (isset ($this->params[0])) ? $this->params[0] === 'default' ? false :(int) $this->params[0] : (isset ($data['id']) ? (int) $data['id'] : 0);
$color = (isset($data['override']) && $data['override'] == 1 && isset($data['color']) ? $data['color'] : false);
$async = (isset($data['async']) && $data['async']) ? true : false;

$page->add_script('/apps/polls/js/poll.js','head');
$page->add_style('/apps/polls/css/poll.css', 'head');

if (!$id) $id = polls\Poll::get_default()->id;
$head = false;
if (!$this->internal || $async) {
	$head = View::render('polls/head', array(
		'polls' => polls\Poll::query()
			->where('visible',true)
			->order('id','desc')
			->fetch_assoc('id','title'),
		'active' => $id
	));
}
echo View::render('polls/index',array('current'=>$id, 'color'=>$color, 'head'=>$head));


?>
