<?php

date_default_timezone_set("America/New_York");

?>

<!DOCTYPE html>
<html>
<head>
	<title>DateJS Test</title>
	<script type="text/javascript" src="app.js"></script>
	<script type="text/javascript" src="../src/DateJS.js"></script>
	<script type="text/javascript">
		var d = new DateJS();
	</script>
	<style type="text/css">
		.check{width:30px;height:30px;background:transparent none no-repeat center;}
		.check.success{background-image:url(data:image/gif;base64,R0lGODlhEAAQAPMJAACZAMzMzJnMmZmZmWaZZjOZMzOZAMz/zABmAP///wAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QAT8AIfkEBQAACQAsAAAAABAAEAAABFswyXRIQaiQM7tARigiQncUYioWXEKosEEkARjLIVLdcvDKqBghIFjZVMNBChMa/JKqDKBHgKYAGoB2GFBqv4AN4jsQgL+6hPnMLkkIbPDMMz6TOpODwKIRtCQRADs=);}
		.check.error{background-image:url(data:image/gif;base64,R0lGODlhEAAQAPMKAJkzM//MzP9mZszMzMyZmcxmZswzM8wAAJkAAP///wAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QAT8AIfkEBQAACgAsAAAAABAAEAAABF5QyUlrDaQYU0iwCsEJpLARlUhqo4ZKAVdoSSJrX7jt9X5Ksx0gMUAYERwJQIgYFI8AgHJzdB4RUaDhwD0YuwdAQSIC18CAV2DZPXcBuRAbzE2nomi7BVOIduIggRIRADs=);}
	</style>
</head>
<body>
	<table border="1" cellspacing="5" cellpadding="5">
		<tr>
			<th style="border:none;"></th>
			<th>Format<br />Character</th>
			<th>date()</th>
			<th>DateJS</th>
		</tr>
<?php
	$formats = array(
		"d", "D", "j", "l", "N", "S", "w", "z", "w", "F",
		"m", "M", "n", "t", "L", "o", "Y", "y", "a", "A",
		"B", "g", "G", "h", "H", "i", "s", "u", "e", "I",
		"O", "P", "T", "Z", "c", "r", "U"
	);

	foreach ($formats as $format):
?>
		<tr>
			<td class="check"></td>
			<td align="center"><?php echo $format; ?></td>
			<td class="a"><?php echo date($format); ?></td>
			<td class="b"><script type="text/javascript">document.write(d.date("<?php echo $format; ?>"));</script></td>
		</tr>
<?php
	endforeach;
?>

	</table>
</body>
</html>