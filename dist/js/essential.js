// getting all tags
const allTags = document.querySelectorAll("*");

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
	let groups = [];
	if (genArr != null) {
		genArr.forEach((value, index) => {
			if (index > 0) {
				groups.push(value);
			}
		});
		return groups;
	} else {
		return false;
	}
}

// generate properties (combine groups and replace , and - with a whitespace)
function generateProperties(groups) {
	let properties = [];
	groups.forEach((group) => {
		// use regular expression with a g tag to replace all occurence instead of just the first one
		let genProp = group.replace(/-/g, " ");
		genProp = genProp.replace(/,/g, ", ");
		properties.push(genProp);
	});
	return properties;
}

// set properties
function setProperties(tag, targets, properties) {
	// console.log(tag, targets, properties);
	targets.forEach((target, index) => {
		if (properties.length == 1)
			tag.style.setProperty(target, properties[0]);
		else {
			tag.style.setProperty(target, properties[index]);
		}
	});
}

// process expressions
function processExpressions(expressions, targets) {
	expressions.forEach((expression, index) => {
		let tags = getTags(expression);
		if (!tags) return;
		tags.forEach((tag) => {
			tag.classList.forEach((tagClass) => {
				let groups = getGroups(expression, tagClass);
				if (!groups) return;
				let properties = generateProperties(groups);
				setProperties(tag, targets[index], properties);
			});
		});
	});
}

// regular expressions
// class height
const heightRE = /^h-(\S{1,100})$/;
const maxHeightRE = /^mh-(\S{1,100})$/;
// process class height
processExpressions([heightRE, maxHeightRE], [["height", "max-height"]]);

// class width
const widthRE = /^w-(\S{1,100})$/;
const maxWidthRE = /^mw-(\S{1,100})$/;
// process class width
processExpressions([widthRE, maxWidthRE], [["width"], ["max-width"]]);

// class columnn
const columnRE = /^col-(\S{1,100})$/;
// process class columnn
processExpressions([columnRE], [["width"]]);

// class color
// process class color
const colorRE = /^color-(\S{1,100})$/;
processExpressions([colorRE], [["color"]]);

// class background
const backgroundRE = /^bg-(\S{1,100})$/;
// process class background
processExpressions([backgroundRE], [["background"]]);

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
const borderTopRE = /^border-top-(\S{1,100})/;
const borderBottomRE = /^border-bottom-(\S{1,100})/;
const borderRightRE = /^border-right-(\S{1,100})/;
const borderLeftRE = /^border-left-(\S{1,100})/;
const borderStyleRE = /^bs-(\S{1,100})/;
const borderWidthRE = /^bw-(\S{1,100})/;
const borderColorRE = /^bc-(\S{1,100})/;
const borderRadiusRE = /^br-(\S{1,100})/;
const outlineRE = /^outline-(\S{1,100})/;

// process class border
processExpressions(
	[
		borderRE,
		borderStyleRE,
		borderWidthRE,
		borderColorRE,
		borderRadiusRE,
		borderTopRE,
		borderBottomRE,
		borderRightRE,
		borderLeftRE,
		outlineRE,
	],
	[
		["border"],
		["border-style"],
		["border-width"],
		["border-color"],
		["border-radius"],
		["border-top"],
		["border-bottom"],
		["border-right"],
		["border-left"],
		["outline"],
	]
);

// class typography
const textIndentRE = /^indent-(\S{1,100})$/;
const lineHeightRE = /^line-(\S{1,100})$/;
const fontSizeRE = /^font-size-(\S{1,100})$/;
const fontWeightRE = /^font-weight-(\S{1,100})$/;
// process class typography
processExpressions(
	[textIndentRE, lineHeightRE, fontSizeRE, fontWeightRE],
	[["text-indent"], ["line-height"], ["font-size"], ["font-weight"]]
);

// class opacity
const opacityRE = /^op-(\S{1,100})$/;
// process class opacity
processExpressions([opacityRE], [["opacity"]]);

// class flex
const flexRE = /^flex-(\S{1,100})$/;
const flexBasisRE = /^flex-basis-(\S{1,100})$/;
const orderRE = /^order-(\S{1,100})$/;
// process class flex
processExpressions(
	[flexRE, flexBasisRE, orderRE],
	[["flex"], ["flex-basis"], ["order"]]
);

// class button
const buttonRE = /^btn-(\S{1,100})$/;
// process class button
processExpressions([buttonRE], [["padding"]]);
