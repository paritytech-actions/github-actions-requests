module.exports = async ({github, owner, repo, issue_number, codeqlResult}) => {

    console.log(``)
    console.log(`Looking at this repository: [${owner}/${repo}] with issue number [${issue_number}]`)
    console.log(`CodeQL scan results:`)
    console.log(`- url: ${codeqlResult.url}`)
    console.log(`- results.count: [${codeqlResult.results_count}]`)
    console.log(`- environment: [${codeqlResult.environment}]`)
    console.log(`- created_at: [${codeqlResult.created_at}]`)
    
    let codeQLSymbol = ''
    if (codeqlResult.results_count === 0) {
        codeQLSymbol = ':white_check_mark:'
    }
    else {
        codeQLSymbol = ':x:'
    }

    let commentBody = [
        "Found these results:",
        "",
        "|Check|Results|",
        "|---|---|",
        '|CodeQL on the forked repo|${codeQLSymbol}|',
        "",
        ":robot:"
      ]
      
      // create comment letting the user know the results
      const result = await github.rest.issues.createComment({
        owner,
        repo,
        issue_number,
        body: commentBody.join('\n')
      });

      console.log(`Created comment with results`)
      console.log(`Issue create result: [${JSON.stringify(result)}]`)
}  