; <?php /*

[polls/index]

label = "Embed a Poll"
icon = check

id[label] = Poll
id[type] = select
id[require] = "apps/polls/lib/Functions.php"
id[callback] = "polls_list_all"
id[not empty] = 1
id[message] = "Please choose a poll."

async[label] = Multi-poll Widget
async[type] = select
async[require] = "apps/polls/lib/Functions.php"
async[callback] = "polls_yesno"
async[not empty] = 1
async[message] = "Enable widget to display multiple polls?"

override[label] = "Override the poll's default color?"
override[type] = select
override[callback] = "polls_yesno"
override[initial] = No

color[label] = "Override Color"
color[type] = color

; */ ?>
