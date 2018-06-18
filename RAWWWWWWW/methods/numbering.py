import re

def number(m):
	# numbers each occurrence of matching
	number.i += 1
	return "{}\n// module[{}]\n".format(m.group(0), number.i)
number.i = -1

def replace(text, replacements):
	regex = re.compile(replacements)
	# replace with //module[i] at end
	return regex.sub(lambda m: number(m), text)

with open("beautified.js", "r", encoding='utf-8') as fin, open("numbered.js", 'w', encoding='utf-8') as fout:
	for line in fin.readlines():
		line = replace(line, "^\t}(, |\(\[)function.*\n")
		fout.write(line)
	fin.close()
	fout.close()
