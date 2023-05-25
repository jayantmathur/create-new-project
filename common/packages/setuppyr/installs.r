package.check <- function(packages) {
    lapply(
        packages,
        FUN = function(x) {
            if (!require(x, character.only = TRUE)) {
                install.packages(x, dependencies = TRUE, repos = "https://cloud.r-project.org")
                library(x, character.only = TRUE)
            }
        }
    )
}

pkgs <- installed.packages()
remove.packages(pkgs[, 1])

package.check(c("IRkernel", "languageserver", "rmarkdown"))
