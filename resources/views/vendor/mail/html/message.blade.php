<x-mail::layout>
{{-- Header --}}
<x-slot:header>
<x-mail::header url="https://nzhf.org">
<img
    width="135"
    height="70"
    src="{{ url('/logo.png') }}"
    alt="{{ config('app.name') }}"
/>
</x-mail::header>
</x-slot:header>

{{-- Body --}}
{{ $slot }}

{{-- Subcopy --}}
@isset($subcopy)
<x-slot:subcopy>
<x-mail::subcopy>
{{ $subcopy }}
</x-mail::subcopy>
</x-slot:subcopy>
@endisset

{{-- Footer --}}
<x-slot:footer>
<x-mail::footer>
© {{ date('Y') }} {{ config('app.name') }}. @lang('All rights reserved.')
</x-mail::footer>
</x-slot:footer>
</x-mail::layout>
