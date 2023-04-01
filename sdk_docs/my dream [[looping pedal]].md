- A [[musical invention]] I'm starting to dream up.
- Observations
    - Two major actions I take when looping
        - Another layer on the current thing
            - Often earlier additions are shorter, later additions are longer (additions need to be able to be variable length)
                - This implies that even "just one track" per phrase can be pretty useful as long as
                    - you can easily "extend underlying loops to match new take" would be a cool feature.
                    - You can add a short track on top and it'll be auto-stretched to the current phrase size.
                - Could be good to have some base track that is reused across phrases.
            - Sometimes I want to be able to jam for a while and then choose some segment of it to loop from
                - Especially when the jamming instrument involves all my body, so I don't have a free thing for starting/stopping the loop.
        - An additional movement to the current thing
            - Currently I don't know of great ways to do this.
                - The RC-600 can let you run it in a mode where each track is in sequence instead of parallel, but this is a totally distinct way to use it, and doesn't compose with the normal flow.
    - There is a lot of power in customization
        - Connectivity with other devices
            - MIDI is cool but also very few devices use low level midi today. Almost would be better off with bluetooth or networking so that an external device like an ipad could also modify parameters.
                - [[CapTP]] would make it pretty fun easy to write external interfaces.
                    - Could make it easy/trivial to share/sync loops with others between the pedal
                        - You could have asynchronous looping jam sessions.
                        - You could either share the ability to read one of your loops, or you could even give someone the [[power/capability]] to add layers/loops to your looper.
                            - While you're playing?
                            - These CapTP "objects" could be compatible  with [[The Agoric Blockchain]], so users would have the option to do what they want with that.
                                - Real time auction rights to remix each track in their loop?
                                - Let some other mechanism decide who can contribute?
                                - Obviously a person could always wire up anything to a blockchain smart contract by another mechanism, so the real innovation here would just be having real-time syncing of loop data.
        - Changing how the internals/pedals work & what they do
            - Could be extensible/updatable code? Makes me think about how [[Moddable SDK]] supports [[Compartment]] API.
- Some possible designs
    - add/undo/edit/share system
        - Just 4 main buttons
            - add
                - If already recording, end the recording and add the loop to the top of the current movement's loop stack.
                - If there is no loop yet, begins a recording.
                - start/stops adding a layer to the current loop.
            - undo
                - removes the top layer from the current movement
            - share
                - If a new device is connected, ideally it tries to auto-sync with the nearby source if possible using mic.
- Implementation
    - [[sooper looper]]