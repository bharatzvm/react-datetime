" To open files from vim 
set suffixesadd+=.js

" Don't create swap files
set noswapfile

" Ignore files in ctrl+p
set wildignore+=*/tmp/*,*.so,*.swp,*.zip,node_modules*,log/*     " MacOSX/Linux

let g:ctrlp_custom_ignore = '\v[\/]\.(git|hg|svn)$'
let g:ctrlp_custom_ignore = {
  \ 'dir':  '\v[\/]\.(git|hg|svn)$',
  \ 'file': '\v\.(exe|so|dll|log)$',
  \ 'link': 'some_bad_symbolic_links',
  \ }

" Syntastic javascript checker
let g:syntastic_javascript_checkers = ['eslint']

" tabs
set shiftwidth=4 tabstop=4 expandtab softtabstop=0 smarttab

" Dont open preview window
set completeopt-=preview

" set path
set path+=**
