const vscode = require('vscode');
const config = vscode.workspace.getConfiguration('lineJourneyUndo');

let lineHistory = []; // Array to store line changes
let currentIndex = -1; // Current index in line history
let delayTimer;
const delayTimerDuration = config.get('delayTimer', 500); // Default value is 500ms
const maxHistoryLimit = config.get('maxHistoryLimit', 50); // Default value is 50


let documentLineHistories = {}; // Object to store line histories for each document/tab

function handleLineChange(editor) {
	const documentUri = editor.document.uri.toString();

	// Check if the document has an associated line history, if not, create one
	if (!documentLineHistories[documentUri]) {
		documentLineHistories[documentUri] = {
			lineHistory: [],
			currentIndex: -1
		};
	}

	const { lineHistory, currentIndex } = documentLineHistories[documentUri];
	const currentPosition = editor.selection.active;
	const currentLineNumber = currentPosition.line;
	const currentColumn = currentPosition.character;

	clearTimeout(documentLineHistories[documentUri].delayTimer);
	documentLineHistories[documentUri].delayTimer = setTimeout(() => {
		if (
			currentLineNumber !== lineHistory[currentIndex]?.line ||
			currentColumn !== lineHistory[currentIndex]?.column
		) {
			addToHistory(documentUri, currentLineNumber, currentColumn);
		}
	}, delayTimerDuration); // Set a delay (adjust as needed)

	// console.log(lineHistory, ' <<<<<<<<<<<<<');
}

function addToHistory(documentUri, lineNumber, column) {
	const { lineHistory, currentIndex } = documentLineHistories[documentUri];

	lineHistory.splice(currentIndex + 1);
	lineHistory.push({ line: lineNumber, column });

	// Limit the number of stored lines to a certain maximum (e.g., 50)
	if (lineHistory.length > maxHistoryLimit) {
		lineHistory.shift(); // Remove the oldest entry
	}

	documentLineHistories[documentUri].currentIndex = lineHistory.length - 1;
}

function navigateBackward(editor) {
	const documentUri = editor.document.uri.toString();
	const { lineHistory, currentIndex } = documentLineHistories[documentUri];

	if (currentIndex > 0) {
		documentLineHistories[documentUri].currentIndex--;
		const previousLineNumber = lineHistory[currentIndex - 1];
		navigateToLine(editor, previousLineNumber);
	}
}

function navigateForward(editor) {
	const documentUri = editor.document.uri.toString();
	const { lineHistory, currentIndex } = documentLineHistories[documentUri];

	if (currentIndex < lineHistory.length - 1) {
		documentLineHistories[documentUri].currentIndex++;
		const nextLineNumber = lineHistory[currentIndex + 1];
		navigateToLine(editor, nextLineNumber);
	}
}

let decorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255, 29, 88, 0.5)', // Use the color #ff1d58 with 50% opacity
    isWholeLine: true
});

function navigateToLine(editor, lineNumber) {
	const newPosition = editor.selection.active.with(lineNumber.line, lineNumber.column);
	editor.selection = new vscode.Selection(newPosition, newPosition);
	editor.revealRange(new vscode.Range(newPosition, newPosition), vscode.TextEditorRevealType.InCenter);

	// Create a decoration on the line that has been navigated to
	let decoration = { range: new vscode.Range(newPosition, newPosition) };
	editor.setDecorations(decorationType, [decoration]);

	// Remove the decoration after 500ms
	setTimeout(() => {
		editor.setDecorations(decorationType, []);
	}, 500);
}

function activate(context) {
	let disposable = vscode.window.onDidChangeTextEditorSelection((event) => {
		handleLineChange(event.textEditor);
	});

	context.subscriptions.push(disposable);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.navigateBackwardInLine', () => {
			navigateBackward(vscode.window.activeTextEditor);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.navigateForwardInLine', () => {
			navigateForward(vscode.window.activeTextEditor);
		})
	);
}

let commandsRegistered = false; // Flag to track command registration
function activate(context) {
	let disposable = vscode.window.onDidChangeTextEditorSelection((event) => {
		handleLineChange(event.textEditor);
	});

	context.subscriptions.push(disposable);

	if (!commandsRegistered) {
		let navigateBackwardCommand = vscode.commands.registerCommand('extension.navigateBackwardInLine', () => {
			navigateBackward(vscode.window.activeTextEditor);
		});

		let navigateForwardCommand = vscode.commands.registerCommand('extension.navigateForwardInLine', () => {
			navigateForward(vscode.window.activeTextEditor);
		});

		context.subscriptions.push(navigateBackwardCommand, navigateForwardCommand);
		commandsRegistered = true;
	}
}


function deactivate() { }

module.exports = {
	activate,
	deactivate
};