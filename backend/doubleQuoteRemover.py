def convertJSON(inp):
    output = ""

    curropen = 0
    i = 0
    while i < len(inp):
        c = inp[i]
        if (c == "\n"):
            curropen = 0
        elif (c == ":"):
            curropen = 2
        elif (c == '"' and not (i == len(inp)-1 or inp[i+1] == "," or inp[i+1] == '\n')):
            if (curropen == 2):
                curropen = 1
            elif (curropen == 1 and i > 0 and inp[i-1] != "\\"):
                output += '\\'

        output += c
        i += 1

    return output
