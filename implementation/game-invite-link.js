<!DOCTYPE html>
<html>
<head>
	<title>Game Invitation Component</title>
	<style>
		.invite-link {
			display: inline-block;
			padding: 10px;
			background-color: #f2f2f2;
			border: 1px solid #ccc;
			border-radius: 5px;
			font-size: 16px;
			color: #333;
			cursor: pointer;
		}
		.invite-link:hover {
			background-color: #ddd;
		}
	</style>
</head>
<body>
	<div id="game-invitation-component">
		<input type="text" id="invite-link-input" readonly>
		<button id="copy-invite-link-button">Copy Link</button>
	</div>

	<script>
		const gameBoardComponent = {
			receiveInviteLink: function(link) {
				// implementation for receiving invite link from Game Board Component
			}
		};

		const gameInvitationComponent = {
			init: function() {
				const inviteLinkInput = document.getElementById('invite-link-input');
				const copyInviteLinkButton = document.getElementById('copy-invite-link-button');

				// generate invite link
				const inviteLink = 'https://example.com/game?invite=123456';

				// display invite link
				inviteLinkInput.value = inviteLink;

				// copy invite link to clipboard
				copyInviteLinkButton.addEventListener('click', function() {
					inviteLinkInput.select();
					document.execCommand('copy');
				});

				// send invite link to Game Board Component
				gameBoardComponent.receiveInviteLink(inviteLink);
			}
		};

		gameInvitationComponent.init();
	</script>
</body>
</html>