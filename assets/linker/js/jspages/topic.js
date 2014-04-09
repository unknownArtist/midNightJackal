$(document).ready(function(){
	$('#submitTopic').click(function(e){
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: '/topic/create',
			data: { title: $('#topicName').val(), body: $('#topicBody').val() },
			success: function(data)
			{
				if(data.status === 200)
				{
					alert("Topic created successfully");
				}
			}
		});
	});

	$('#writeAnswer').click(function(e){
		e.preventDefault();
		$(this).addClass('disabled');
		$.ajax({
			type: 'POST',
			url: '/topic/reply',
			data: { topicId: $('#topicId').val(), body: $('#replyBody').val() },
			success: function(data)
			{
				if(data.status === 200)
				{
					$("#TopicReplies").append('<p>'+data.reply.body+'</p>');
					$('#replyBody').val('');


				}else if(data.status === 404)
					{
						if(data.error.ValidationError.body[0].rule === 'required')
						{
							alert("Kindly write answer");
							
						}
					}
			}
		});
		$(this).removeClass('disabled');
	});


	
});