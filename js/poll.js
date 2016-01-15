var poll = (function($) {
	var self = {};
	self.submit = function(poll, id) {
		var info = poll.previousElementSibling;
		if (info.dataset['loading'] != true) {
			var out = {};
			var send = false;
			info.dataset['loading'] = true;
			$(poll).find('input.poll-option').each(function(index, node) {
				out[node.value] = node.checked;
				if (node.checked) send = true;
			});
			if (send) {
				info.innerText = 'Submitting vote...';
				$.post('/polls/api/vote/'+ id, {data:out}, null, 'json'
				).done(function(res){
					if (res.success) {
						info.dataset['current'] = res.data.id;
						info.innerText = 'Vote submitted successfully.';
						info.style.display = 'block';
						poll.innerHTML = res.data.html;
					} else {
						info.innerText = res.error;
						info.style.display = 'block';
					}
				}).fail(function(){
					info.innerText = 'Vote submission failed.';
					info.style.display = 'block';
				}).always(function(){
					info.dataset['loading'] = false;
					clearTimeout(self.timeout);
					self.timeout = setTimeout(function(){
						info.style.display = 'none';
					},5000);
				});
			} else {
				info.innerText = 'Must select at least one choice.';
				info.dataset['loading'] = false;
				info.style.display = 'block';
				clearTimeout(info.dataset['timeout']);
				info.dataset['timeout'] = setTimeout(function(){
					info.style.display = 'none';
				},5000);
			}
		}
	
	};
	self.get = function(poll, id, get, force) {
		var info = poll.previousElementSibling;
		if (info.dataset['loading'] != true) {
			info.dataset['loading'] = true;
			info.innerText = 'Loading poll...';
			info.style.display = 'block';
			if (!force) force = false;
			$.get('/polls/api/'+ get +'/'+ id , {force:force,color:info.dataset['override']}, null, 'json'
			).done(function(res){
				if (res.success) {
					info.dataset['current'] = res.data.id;
					info.innerText = 'Poll loaded successfully.';
					info.style.display = 'block';
					poll.innerHTML = res.data.html;
				} else {
					info.innerText = res.error;
					info.style.display = 'block';
				}
			}).fail(function(){
				info.innerText = 'Failed to load requested poll.';
			}).always(function(){
				info.dataset['loading'] = false;
				clearTimeout(info.dataset['timeout']);
				info.dataset['timeout'] = setTimeout(function(){
					info.style.display = 'none';
				},5000);
			});
		}
	};
	
	// Initialize any polls on the page.
	$(function() {
		$('.poll').each(function(){
			if (this.lastElementChild.previousElementSibling.dataset['init'] != true) {
				self.get(this.lastElementChild, this.lastElementChild.previousElementSibling.dataset['current'],'poll');
				this.lastElementChild.previousElementSibling.dataset['init'] = true;
			}
		});
	});
	
	return self;
	
}(jQuery));
	

