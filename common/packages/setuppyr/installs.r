package.check <- function(packages) {
    lapply(
        packages,
        FUN = function(x) {
            if (!require(x, character.only = TRUE)) {
                install.packages(x, dependencies = TRUE, repos = "https://cloud.r-project.org")
            }
        }
    )
}

# pkgs <- installed.packages()
# remove.packages(pkgs[, 1])

package.check(c("languageserver", "rmarkdown", "jsonlite", "IRkernel"))

IRkernel::installspec()
