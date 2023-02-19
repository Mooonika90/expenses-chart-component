const year = document.querySelector('.year');
const xmlhttp = new XMLHttpRequest();
const url = 'https://raw.githubusercontent.com/Mooonika90/expenses-chart-component/main/data.json';
xmlhttp.open('GET', url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		const data = JSON.parse(this.responseText);
		day = data.data_exp.map(function (elem) {
			return elem.day;
		});
		amount = data.data_exp.map(function (elem) {
			return elem.amount;
		});
		let higestAmount = Object.values(amount);
		let max = Math.max(...higestAmount);
		const canvasBox = document.querySelector('.chart-expenses');
		new Chart(canvasBox, {
			type: 'bar',
			data: {
				labels: day,
				datasets: [
					{
						data: amount,
						borderWidth: 1,
						backgroundColor: (amount) => {
							if (amount.raw === max) {
								return 'hsl(186, 34%, 60%)';
							} else if (amount) {
								return 'hsl(10, 79%, 65%)';
							}
						},
						hoverBackgroundColor: (amount) => {
							if (amount.raw === max) {
								return 'hsla(186, 49%, 80%, 1)';
							} else if (amount) {
								return 'hsla(10, 100%, 76%, 1)';
							}
						},
						borderRadius: 5,
						borderSkipped: false,
					},
				],
			},
			options: {
				interaction: {
					mode: 'index',
				},
				scales: {
					y: {
						beginAtZero: true,
						border: {
							color: 'transparent',
						},
						ticks: {
							display: false,
						},
						grid: {
							display: false,
							drawBorder: false,
							drawTicks: false,
						},
					},
					x: {
						border: {
							color: 'transparent',
						},
						grid: {
							display: false,
							drawBorder: false,
						},
					},
				},
				plugins: {
					tooltip: {
						callbacks: {
							title: (tooltipItems) => {
								return '';
							},
							label: function (context) {
								return '$' + context.formattedValue;
							},
						},
						displayColors: false,
					},
					legend: {
						display: false,
					},
				},
			},
		});
	}
};
const currentYear = () => {
	const newDate = new Date();
	const currentDate = newDate.getFullYear();
	year.textContent = currentDate;
};
currentYear();
