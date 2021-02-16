// getting divs
const allTags = document.querySelectorAll("*");
console.log(allTags);

// get tags
function getTags(expression) {
	let tags = [];
	allTags.forEach((tag) => {
		tag.classList.forEach((tagClass) => {
			if (expression.test(tagClass)) {
				tags.push(tag);
			}
		});
	});
	if (tags.length > 0) return tags;
	else return false;
}

// get groups
function getGroups(expression, className) {
	let genArr = expression.exec(className);
	let groupArr = [];
	if (genArr != null) {
		// console.log(genArr);
		genArr.forEach((value, index) => {
			if (index > 0) {
				groupArr.push(value);
			}
		});
		return groupArr;
	} else {
		return false;
	}
}

// generate properties (combine groups and replace , and - with a whitespace)
function generateProperties(groups) {
	let genPropArr = [];
	groups.forEach((group) => {
		// use regular expression with a g tag to replace all occurence instead of just the first one
		let genProp = group.replace(/-/g, " ");
		genPropArr.push(genProp);
	});
	return genPropArr;
}

// set properties
function setProperties(tag, targets, properties) {
	targets.forEach((target) => {
		properties.forEach((prop) => {
			tag.style.setProperty(target, prop);
		});
	});
}

// process expression
function processExpressions(expressionArr, targetArr) {
	expressionArr.forEach((expression, index) => {
		let tags = getTags(expression);
		if (!tags) return;
		tags.forEach((tag) => {
			tag.classList.forEach((tagClass) => {
				let groups = getGroups(expression, tagClass);
				if (!groups) return;
				let genPropArr = generateProperties(groups);
				console.log(targetArr[index]);
				console.log(genPropArr);
				setProperties(tag, targetArr[index], genPropArr);
			});
		});
	});
}

// regular expressions

// class margin
const marginRE = /^m-(\S{1,100})$/;
const marginTopRE = /^mt-(\S{1,100})$/;
const marginBottomRE = /^mb-(\S{1,100})$/;
const marginLeftRE = /^ml-(\S{1,100})$/;
const marginRightRE = /^mr-(\S{1,100})$/;
const marginXRE = /^mx-(\S{1,100})$/;
const marginYRE = /^my-(\S{1,100})$/;

// process class margin
processExpressions(
	[
		marginRE,
		marginTopRE,
		marginBottomRE,
		marginLeftRE,
		marginRightRE,
		marginXRE,
		marginYRE,
	],
	[
		["margin"],
		["margin-top"],
		["margin-bottom"],
		["margin-left"],
		["margin-right"],
		["margin-left", "margin-right"],
		["margin-top", "margin-bottom"],
	]
);

// class padding
const paddingRE = /^p-(\S{1,100})$/;
const paddingTopRE = /^pt-(\S{1,100})$/;
const paddingBottomRE = /^pb-(\S{1,100})$/;
const paddingLeftRE = /^pl-(\S{1,100})$/;
const paddingRightRE = /^pr-(\S{1,100})$/;
const paddingXRE = /^px-(\S{1,100})$/;
const paddingYRE = /^py-(\S{1,100})$/;

// process class padding
processExpressions(
	[
		paddingRE,
		paddingTopRE,
		paddingBottomRE,
		paddingLeftRE,
		paddingRightRE,
		paddingXRE,
		paddingYRE,
	],
	[
		["padding"],
		["padding-top"],
		["padding-bottom"],
		["padding-left"],
		["padding-right"],
		["padding-left", "padding-right"],
		["padding-top", "padding-bottom"],
	]
);

// class border
const borderRE = /^border-(\S{1,100})$/;

// process class border
processExpressions([borderRE], [["border"]]);

// class color
const colorRE = /^color-(\S{1,100})$/;
processExpressions([colorRE], [["color"]]);

// class container
const containerRE = /^container-(\S{1,100})$/;

// process class container
processExpressions([containerRE], [["width"]]);
